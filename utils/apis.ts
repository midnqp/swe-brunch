
const backendApis = {
    listMenus() {
        //return makeApiRequest('GET', "/menus")
    },
    listItemsByMenu(id:string) {
        //return makeApiRequest('GET', `/items?byMenuId=${id}`)
    },
    listEngineersItems() {
        return [
            {
id: 'eng-1',
name: 'Cheese Mushroom Omelette',
price: 439,
image: '/cheese-omlette.jpg',
description: ''
            },
            {
id: 'eng-2',
name: 'American Breakfast',
price: 670,
image: '/american-breakfast.jpg',
description: ''
            },
            {
                id: 'eng-3',
                name: 'Beef Burger',
                price: 686,
                image: '/beef-burger.jpg',
                description: ''
            },
            {
                id: 'eng-4',
                name: 'Cappucino',
                price: '255',
                image: '/cappucino.jpg',
                description: ''
            }
        ].map(e => {
            e.description = 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet'
            return e
        })
    },
    listProductManagersItems() {},
    listFoundersItems() {},
}

const backendApiBaseUrl = "https://swe-brunch-backend.vercel.app/api/v1"

// TODO
function makeApiRequest(method: string, url:string) {
    const u = backendApiBaseUrl+url
    return fetch(u, {method: method})
}

export default backendApis 