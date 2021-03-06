import throttle from 'lodash.throttle'

import {measureScrollHeight, measureClientHeight, measureOffsetHeight} from '../measurements'
import defaults from '../defaults'

function content (config = defaults) {
  const measurementElements = [document.body, document.documentElement]
  const measurementFunctions = [measureScrollHeight, measureClientHeight, measureOffsetHeight]

  const options = {...defaults, ...config}

  var observer = null

  function getHeight () {
    let measurements = measurementElements.reduce(function measureElement (results, element) {
      let elementMeasurements = measurementFunctions
        .map(function applyMeasurement (measurementFunction) {
          return measurementFunction(element)
        })
        .filter(measurement => typeof measurement !== 'undefined')

      return [...results, ...elementMeasurements]
    }, [])

    return Math.max(...measurements)
  }

  function send () {
    if (!window.frameElement) {
      return
    }

    window.parent.postMessage({
      type: options.name,
      height: getHeight(),
      id: window.frameElement.id
    },
    options.domain)
  }

  const throttledSend = throttle(send, options.throttle)

  function onMessage (e) {
    if (e.data.type !== options.name) {
      return
    }

    if (!window.frameElement || e.data.id !== window.frameElement.id) {
      return
    }

    throttledSend(e)
  }

  function stop () {
    let api = {observer, stop, start}

    window.removeEventListener('message', onMessage)
    window.removeEventListener('load', throttledSend)
    window.removeEventListener('resize', throttledSend)
    document.body.removeEventListener('transitionend', throttledSend)

    if (!observer) {
      return api
    }

    observer.disconnect()

    return api
  }

  function start () {
    let api = {observer, stop, start}

    if (!('frameElement' in window)) {
      return api
    }

    if (!('parent' in window)) {
      return api
    }

    if (!('postMessage' in window.parent)) {
      return api
    }

    if (!('addEventListener' in window)) {
      return api
    }

    // Disallow margin and padding on measurementElements
    measurementElements.forEach(measurementElement => measurementElement.style.margin = 0)
    measurementElements.forEach(measurementElement => measurementElement.style.padding = 0)

    window.addEventListener('message', onMessage)
    window.addEventListener('load', throttledSend)
    window.addEventListener('resize', throttledSend)
    document.body.addEventListener('transitionend', throttledSend)

    if (!('MutationObserver' in window)) {
      return api
    }

    observer = observer || new window.MutationObserver(throttledSend)

    observer.observe(document.body, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true
    })

    return api
  }

  return start()
}

module.exports = content
