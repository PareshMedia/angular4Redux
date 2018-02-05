export const items = (state: any = [], { type, payload }) => {
  switch (type) {

    case 'CREATE_ITEM':
      return [...state, payload];

    case 'DELETE_ITEM':
      return state.filter(item => {
        return item.woeid !== payload.woeid;
      });

    default:
      return state;
  }
};
