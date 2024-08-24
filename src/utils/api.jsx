import axios from "axios";

export const fetchProductById = async (id) => {
    let response = await axios.get(`https://e-comm-backend-pkj2.onrender.com/api/product/${id}`,)

    if (response.data.status === "success") {
        return response.data.data
    } else {
        return null
    }
};

export const fetchRecommendedProducts = async () => {
    let response = await axios.get("https://e-comm-backend-pkj2.onrender.com/api/products?limit=5")

    if (response.data.status === "success") {
        return response.data.data
    } else {
        return null
    }

}

export const fetchProducts = async () => {
    try {
        let response = await axios.get("https://e-comm-backend-pkj2.onrender.com/api/products")

        if (response.data.status === "success") {
            return response.data.data
        } else {
            return nulll
        }
    } catch (error) {
        return null
    }
}

export const fetchProductHome = async () => {
    try {
        let response = await axios.get("https://e-comm-backend-pkj2.onrender.com/api/products?limit=8")

        if (response.data.status === "success") {
            return response.data.data
        } else {
            return null
        }

    } catch (error) {
        console.log(error)
    }
}

