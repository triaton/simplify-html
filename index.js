const tagsWhitelist = ['div', 'a', 'span', 'p', 'section', 'br', 'b', 'strong', 'i', 'u']
const attributesWhitelist = ['hef', 'alt', 'title', 'target', 'style']
const styleWhitelist = ['font-weight', 'text-decoration']

const preProcessHtml = html => {
	let content = html;
	// TODO: remove comment
	content = removeComments(content);
	console.log('comments removed = ', content)
	// TODO: remove non-whitelisted tags (remove only openning and closing tags, not the content)
	content = removeTags(content);
	// TODO: remove non-whitelisted attributes on each tags
	content = removeAttribs(content);
	// TODO: remove unncessary style attributes and leave only whitelisted styles
	content = updateStyles(content);
	return content;
}

const removeComments = html => {
	return html.replace(/<!--.*?-->/g, '')
}

const removeTags = html => {
	const matches = html.matchAll(/<.+?(\/)?/g)
	return matches.reduce((result, match) => {
		const tag = extractTag(match)
		if (tagsWhitelist.includes(`<${tag}`)) {
			return result
		} else {
			return result.replace(match, '')
		}
	}, html)
}

const removeAttribs = html => {
	// TODO: add implementation
	return html;
}

const updateStyles = html => {
	// TODO: add implementation
	return html;
}

const extractTag = html => {
	const matches = html.match(/<(?:\/)?(\w+).*(?:\/)?>/)
	if (matches.length) {
		return matches[1]
	}
	return null
}

module.exports = {
	preProcessHtml,
	removeComments,
	removeTags,
	removeAttribs,
	updateStyles,
	extractTag
}