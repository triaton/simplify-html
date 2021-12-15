const {
    original,
    commentsRemoved,
    rawTags,
    tags,
    tagsRemoved,
    attribsRemoved,
    rawAttribs,
    attribs,
} = require("./data");

const {
    removeComments,
    removeTags,
    removeAttribs,
    extractTag,
    extractAttribName,
} = require('./main')

test('removeComments should remove comments from input', () => {
    expect(removeComments(original)).toBe(commentsRemoved);
})

test('extractTag should extract only the tag text', () => {
    rawTags.forEach((rawTag, index) => {
        expect(extractTag(rawTag)).toBe(tags[index])
    })
})

test('extractTag should return null for invalid input', () => {
    expect(extractTag('style="background: black;"')).toBe(null)
})

test('extractAttribName should extract only the attribute name', () => {
    rawAttribs.forEach((rawTag, index) => {
        expect(extractAttribName(rawTag)).toBe(attribs[index])
    })
})
test('extractAttribName should return null for invalid input', () => {
    expect(extractAttribName('<img/>')).toBe(null)
})

test('removeTags should remove all non-whitelist tags', () => {
    expect(removeTags(commentsRemoved)).toBe(tagsRemoved);
})

test('removeAttribs should remove all non-whitelist attributes', () => {
    expect(removeAttribs(tagsRemoved)).toBe(attribsRemoved);
})
