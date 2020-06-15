export const modulesSupplier = async () => {
    return {
        data: [
            { key: "CS2030", text: "CS2030" },
            { key: "CS2040S", text: "CS2040S" },
            { key: "CS2100", text: "CS2100" },
            { key: "CS1101S", text: "CS1101S" }
        ]
    }
}

export const useFetch = (initial, src, query) => {
    const [response, setResponse] = useState(initial)
    const [loading, setLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    useEffect(() => {
        setLoading(true)
        src(query)
            .then((res) => {
                setResponse(res.data)
                setLoading(false)
            })
            .catch(() => {
                setHasError(true)
                setLoading(false)
            })
    }, []);
    return [response, setResponse, loading, hasError];
}