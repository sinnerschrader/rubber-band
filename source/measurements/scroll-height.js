function scrollHeight (element) {
  let {marginTop, marginBottom} = window.getComputedStyle(element)
  let margin = parseInt(marginTop, 10) + parseInt(marginBottom, 10)

  return element.scrollHeight - margin
}

export default scrollHeight
