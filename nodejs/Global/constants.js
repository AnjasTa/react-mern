const dataBase = {
  successfull: "Database connected Successfully..........",
  error: "Database connection failed",
  validationErrors : {
    productname : "product name is required",
    price : "price is required"
  }
};

const serverMessage = {
  message: "Server running........",
};

const productMessages = {
  postProduct: {
    success: "successfull",
    status: {
      yes: "success",
      no: "failed",
    },
  },
  getProduct: {
    status: {
      yes: "success",
      no: "failed",
    },
    message: "data founded",
  },
  deleteProduct: {
    status: {
      yes: "success",
      no: "failed",
    },
    message: {
      yes: "deleted successfully",
      no: "unsuccessfull",
    },
  },
  editProduct: {
    status: {
      yes: "success",
      no: "failed",
    },
    message: {
      fieldError: "some field missing",
      success: "update successfull",
      error: "error found",
    },
  },
};

const authMessages = {
  login: {
    success: "login successfull",
    error: "invalid credentials",
  },
  register: {
    success: "registration successfull",
  },
  unauthorized : 'please authenticate'
};

const routerPath = {
  auth : {
    login :'/signin',
    register : '/signup'
  },
  product : {
    post :'/add-product',
    get : '/get-product',
    put :'/update-product/:id',
    delete : '/delete-product/:id'
  }
}

module.exports = { dataBase, serverMessage, productMessages, authMessages,routerPath };
