<div align="center"><img src="https://user-images.githubusercontent.com/20704726/176831638-a5c27908-365e-4edc-aac8-c7073fc18dfb.png"  width="200"  alt="usdh logo"/>  <h1>useData hook</h1></div>

###  install

    yarn add usdh

or

    pnpm add usdh

  

or

    npm install usdh

  

###  import

    import { useData } from "usdh"

##  useData
useData is the main React hook of usdh.
useData performs a fetch request and returns the data, loading state and error. It will also cache the data for a specified amount of time using the cacheKey or url if no cacheKey is specified. You can also specify optimisticData which will be returned while the data is loading. This is useful for displaying data immediately while the fetch request is being performed. Typically you would use this for data that is not critical to the user experience. For example, if you are displaying a list of todos, you could use optimisticData to display the todos immediately while the fetch request is being performed. If the fetch request fails, the error will be returned and the optimisticData will be removed.

### examples
####  basic

    import { useData } from "usdh"
    
    const App = () => {
      const { data, loading, error } = useData({
        url: "https://jsonplaceholder.typicode.com/todos/1"
      })
    
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error: {error.message}</p>
    
      return (
        <div>
          <h1>{data.title}</h1>
          <p>{data.completed ? "Completed" : "Not completed"}</p>
        </div>
      )
    }
#### with optimisticData

    import { useData } from "usdh"
    
    const App = () => {
      const { data, loading, error } = useData({
        url: "https://jsonplaceholder.typicode.com/todos/1",
        optimisticData: {
          title: "My todo",
          completed: false
        },
        }
      })
    
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error: {error.message}</p>
    
      return (
        <div>
          <h1>{data.title}</h1>
          <p>{data.completed ? "Completed" : "Not completed"}</p>
        </div>
      )
    }

#### with cacheKey and cacheTime
    
          import { useData } from "usdh"
          
          const App = () => {
            const { data, loading, error } = useData({
              url: "https://jsonplaceholder.typicode.com/todos/1",
              cacheKey: "my-todo",
              cacheTime: 1000 * 60 * 60 * 24 // 1 day
            })
          
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error: {error.message}</p>
          
            return (
              <div>
                <h1>{data.title}</h1>
                <p>{data.completed ? "Completed" : "Not completed"}</p>
              </div>
            )
          }
#### with init

    import { useData } from "usdh"
    
    const App = () => {
      const { data, loading, error } = useData({
        url: "https://jsonplaceholder.typicode.com/todos/1",
        init: {
          method: "POST",
          body: JSON.stringify({
            title: "My todo",
            completed: true
          })
        }
      })
    
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error: {error.message}</p>
    
      return (
        <div>
          <h1>{data.title}</h1>
          <p>{data.completed ? "Completed" : "Not completed"}</p>
        </div>
      )
    }

#### with retries
    const App = () => {
      const { data, loading, error } = useData({
        url: "https://jsonplaceholder.typicode.com/todos/1",
        retry: 3
      })
    
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error: {error.message}</p>
    
      return (
        <div>
          <h1>{data.title}</h1>
          <p>{data.completed ? "Completed" : "Not completed"}</p>
        </div>
      )
    }