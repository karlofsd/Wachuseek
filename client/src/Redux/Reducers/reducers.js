const initialState = {
    products:[],
    categories:[],
    product:{},
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
        
      default:
        return state;
    }
  }
  
  export default rootReducer;