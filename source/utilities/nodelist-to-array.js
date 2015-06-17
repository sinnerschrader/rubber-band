function nodelistToArray (nodeList) {
	var array = [];
	for (var i = 0; i < nodeList.length; i += 1) {
		array.push(nodeList[i]);
	}
	return array;
}

module.exports = nodelistToArray;
