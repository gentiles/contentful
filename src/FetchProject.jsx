import { createClient } from "contentful";
import { useState, useEffect } from "react";


const client = createClient({
    space: 'c85pg4fhgiep',
     environment: 'master',
    accessToken: import.meta.env.VITE_API_KEY
})

export const useFetchProjects = () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    const getData = async()=>{
        try {
           const response = await client.getEntries({content_type: 'projects'})
           const projects = response.items.map((item) => {
            const { title, url, image } = item.fields;
            const id = item.sys.id;
            const img = image?.fields?.file?.url;
            return { title, url, id, img };
          });
          console.log(projects)
            setProjects(projects)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(() => { 
        getData()
    }, [])

    return {projects, loading}
}

export default useFetchProjects