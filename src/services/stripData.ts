export const stripCharacterData = (charactersDataContainer: any) => {

    charactersDataContainer.results = charactersDataContainer.results.map(
        (character: detailedCharacter): character => ({
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: {
                path: character.thumbnail.path,
                extension: character.thumbnail.extension
            }
        })
    )

    return charactersDataContainer
}