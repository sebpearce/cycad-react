const initialState = {
  amountInput: '',
  dateInput: (new Date()).toISOString().slice(0,10),
  noteInput: '',
  categoryInput: '',
};

export const capture = (state = initialState, action) => {
  const payload = action.payload;
  
  switch (action.type) {
    case 'UPDATE_AMOUNT_INPUT':
      if (
        String(Number(payload.amt)) !== payload.amt || Number(payload.amt) === 0
      )
        return state;
      return { ...state, amountInput: Number(payload.amt).toFixed(2) };

    case 'UPDATE_DATE_INPUT':
      // TODO: Handle February 30-31, April 31 etc.
      // Maybe if date doesn't match itself when passed through Date()?
      const dateFormat = /^2\d{3}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])$/;
      if (!dateFormat.test(payload.date)) return state;
      return { ...state, dateInput: payload.date };

    case 'UPDATE_NOTE_INPUT':
      return { ...state, noteInput: String(payload.note) };

    case 'UPDATE_CATEGORY_INPUT':
      // if (String(Number(payload.cat_id)) !== payload.cat_id) return state;
      return { ...state, categoryInput: payload.cat_id };

    default:
      return state;
  }
};
