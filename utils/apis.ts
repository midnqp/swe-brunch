const backendApis = {
  createOrder(opts: any) {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
  },

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
  listProductManagersItems() {
    // 250g steak cooked well-done—just like the developers you\'ve cooked in their deadlines.
    return [
      {
        id: "pm-2",
        name: "French Fries",
        price: 299,
        image: "/french-fries.jpg",
        description:
          "A fresh box of precision-cut fries, just as fried as your developers' weekend plans.",
      },
    ]
  },
  listFoundersItems() {
    return [
      {
        id: "founder-1",
        name: "Ramen",
        price: 99,
        image: "/ramen.jpg",
        description:
          "Save money eating ramen like a true founder. You have yet to find product-market fit, so stretch your runway!",
      },
      {
        id: "founder-2",
        name: "Tomahawk Steak",
        price: 2499,
        image: "/steak.jpg",
        description:
          "Just raised a Series A? Treat the entrepreneur in you with a 400g juicy grilled steak.",
      },
      {
        id: "founder-3",
        name: "Sparkling Water",
        price: 599,
        tax: true,
        image: "/water.jpg",
        description:
          "250ml sparkling water, naturally carbonated off Saint-Galmier—only for closers and Series A-ers.",
      },
    ]
  },
}

const backendApiBaseUrl = "https://swe-brunch-backend.vercel.app/api/v1"

// TODO
function makeApiRequest(method: string, url: string) {
  const u = backendApiBaseUrl + url
  return fetch(u, { method: method })
}

export default backendApis
