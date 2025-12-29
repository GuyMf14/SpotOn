export  async function getPosts() {
        await new Promise((resolve) => setTimeout(resolve, 6000));
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
   
    return data;
//return (await fetch('https://jsonplaceholder.typicode.com/posts')).json();

}