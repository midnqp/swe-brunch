const backendApis = {
  listMenus() {
    //return makeApiRequest('GET', "/menus")
  },
  listItemsByMenu(id: string) {
    //return makeApiRequest('GET', `/items?byMenuId=${id}`)
  },
  listEngineersItems() {
    return [
      {
        id: "eng-1",
        name: "Cheese Mushroom Omelette",
        price: 449,
        image: "/cheese-omlette.jpg",
        description:
          "Prepared with egg stuffed with mushrooms & cheese, serve with bread toast, tomato, lettuce & sauce.",
      },
      {
        id: "eng-2",
        name: "American Breakfast",
        price: 699,
        image: "/american-breakfast.jpg",
        description:
          "Consists of 2 pcs chicken salami, 2 pcs pancake, scrambled egg—served with butter & jam.",
      },
      {
        id: "eng-3",
        name: "Beef Burger",
        price: 699,
        image: "/beef-burger.jpg",
        description:
          "Prepared with beef patty, sliced cheese, lettuce, tomato & onion.",
      },
      {
        id: "eng-4",
        name: "Cappucino",
        price: 249,
        image: "/cappucino.jpg",
        description:
          "A delightful blend of espresso, steamed milk & thick milk foam, creating a creamy, frothy texture.",
      },
    ]
  },
  listProductManagersItems() {},
  listFoundersItems() {},
}

const backendApiBaseUrl = "https://swe-brunch-backend.vercel.app/api/v1"

// TODO
function makeApiRequest(method: string, url: string) {
  const u = backendApiBaseUrl + url
  return fetch(u, { method: method })
}

export default backendApis
