const {
    original,
    commentsRemoved,
    rawTags,
    tags,
    tagsRemoved,
    attribsRemoved,
} = require("./data");

const {
    removeComments,
    removeTags,
    removeAttribs,
    extractTag,
} = require('./main')

test('removeComments should remove comments from input', () => {
    expect(removeComments(original)).toBe(commentsRemoved);
})

test('extractTag should extract only the tag text', () => {
    rawTags.forEach((rawTag, index) => {
        expect(extractTag(rawTag)).toBe(tags[index])
    })
})

test('removeTags should remove all non-whitelist tags', () => {
    expect(removeTags(commentsRemoved)).toBe(tagsRemoved);
})

test('removeAttribs should remove all non-whitelist attributes', () => {
    console.log('tagRemoved = ', tagsRemoved)
    expect(removeAttribs(tagsRemoved)).toBe(attribsRemoved);
})
