export default async function fetchApi(method, url, data) {
    return await window.axios({
        method,
        url,
        data,
    });
}
