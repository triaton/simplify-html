const tagsWhitelist = ['div', 'a', 'span', 'p', 'section', 'br', 'b', 'strong', 'i', 'u', 'ul', 'li']
const attributesWhitelist = ['href', 'alt', 'title', 'target', 'style']
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
	// TODO: remove unnecessary style attributes and leave only whitelisted styles
	content = updateStyles(content);
	return content;
}

const removeComments = html => {
	return html.replace(/<!--.*?-->/g, '')
}

const removeTags = html => {
	const matches = html.match(/<(\/)?("[^"]*"|'[^']*'|[^'">])*?(\/)?>\s*/g)
	return matches.reduce((result, match) => {
		const tag = extractTag(match)
		if (tagsWhitelist.includes(tag)) {
			return result
		} else {
			return result.replace(match, '')
		}
	}, html)
}

const removeAttribs = html => {
	const matches = html.match(/[a-zA-Z0-9\-]+=".+?"/g)
	return matches.reduce((result, match) => {
		const attribute = extractAttribName(match)
		if (attributesWhitelist.includes(attribute)) {
			return result
		} else {
			return result.replace(match, '')
		}
	})
}

const updateStyles = html => {
	// TODO: add implementation
	return html;
}

const extractAttribName = html => {
	const match = html.match(/([a-zA-Z0-9\-]+)=/)
	if (match.length) {
		return match[1]
	}
	return null
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