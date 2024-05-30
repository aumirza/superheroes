interface character {
    id: number;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
}

interface detailedCharacter extends character {
    comics: {
        available: number;
        collectionURI: string;
        items: comic[];
        returned: number;
    };
    stories: {
        available: number;
        collectionURI: string;
        items: story[];
        returned: number;
    }
    series: {
        available: number;
        collectionURI: string;
        items: series[];
        returned: number;
    }
    urls: {
        type: string;
        url: string;
    }[]
}

interface series {
    resourceURI: string;
    name: string;
}
interface comic {
    resourceURI: string;
    name: string;
}

interface story {
    resourceURI: string;
    name: string;
    type: string;
}
