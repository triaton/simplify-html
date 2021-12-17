const tagsWhitelist = ['div', 'a', 'span', 'p', 'section', 'br', 'b', 'strong', 'i', 'u', 'ul', 'li']
const attributesWhitelist = ['href', 'alt', 'title', 'target', 'style']
const styleWhitelist = ['font-weight', 'text-decoration']

const preProcessHtml = html => {
	let content = html;
	content = removeComments(content);
	content = removeTags(content);
	content = removeAttribs(content);
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

const updateStyles = html => {
	if (html.trim().startsWith('style=')) {
		const value = html
		const matches = value.match(/\s*[a-z\-]+:\s*((&quot;)|[^"])*?;/g)
		return matches.reduce((result, m) => {
			const property = extractPropertyName(m)
			if (styleWhitelist.includes(property)) {
				return result.replace(m, m.trim())
			} else {
				return result.replace(m, '')
			}
		}, html)
	}
	return html
}

const removeAttribs = html => {
	const matches = html.match(/\s*[a-zA-Z0-9\-]+=".*?"/g)
	return matches.reduce((result, match) => {
		const attribute = extractAttribName(match)
		if (attributesWhitelist.includes(attribute)) {
			if (attribute === 'style') {
				return result.replace(match, updateStyles(match))
			}
			return result
		} else {
			return result.replace(match, '')
		}
	}, html)
}

const extractAttribName = html => {
	const match = html.match(/([a-zA-Z0-9\-]+)=/)
	if (match?.length) {
		return match[1]
	}
	return null
}

const extractPropertyName = html => {
	const match = html.match(/([a-zA-Z0-9\-]+):/)
	if (match?.length) {
		return match[1]
	}
	return null
}

const extractTag = html => {
	const matches = html.match(/<(?:\/)?(\w+).*(?:\/)?>/)
	if (matches?.length) {
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
	extractTag,
	extractAttribName,
	extractPropertyName,
}