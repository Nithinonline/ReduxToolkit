import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    balance: "",
    loan: 0,
    loanPurpose: "",
    isLoading: false,
};

const accountSlice = createSlice({
    name: "account",
    initialState: initialState,
    reducers: {
        deposit(state, action) {
            state.balance = state.balance + action.payload;
            state.isLoading = false
        },
        withdraw(state, action) {
            state.balance = state.balance -= action.payload
        },
        // requestLoan(state,action){
        //     state.loan= action.payload.amount,
        //     state.loanPurpose= action.payload.purpose,
        //     state.balance= state.balance + action.payload.amount
        // },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: { amount, purpose }
                };
            },

            reducer(state, action) {
                if (state.loan > 0) return;
                state.loan = action.payload.amount,
                    state.loanPurpose = action.payload.loanPurpose,
                    state.balance = state.balance + action.payload.amount
            }
        },


        payloan(state, action) {
            state.loan = 0,
                state.loanPurpose = "",
                state.balance = balance - state.loan
        },

        ConvertingCurrency(state, action) {
            state.isLoading = true
        }

    }
})

console.log(accountSlice);

export const { withdraw, payloan, requestLoan } = accountSlice.actions




export function deposit(amount, currency) {
    if (currency === "INR") return { type: "account/deposit", payload: amount };
    return async function (dispatch, getState) {
        dispatch({ type: "account/convertingCurrency" });

        const res = await fetch(
            ` https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=INR`
        );
        const data = await res.json();
        const converted = data.rates.INR;

        dispatch({ type: "account/deposit", payload: converted });
    };
}


export default accountSlice.reducer


// export function deposit(amount, currency) {
//     if (currency === "INR") return { type: "account/deposit", payload: amount }
//     console.log(amount, currency);
//     return async function (dispatch, getState) {
//         dispatch({ type: "account/convertingCurrency" });
//         const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=INR`)

//         const data = await res.json()
//         console.log(data);
//         const converted = data.rates.INR
//         dispatch({ type: "account/deposit", payload: converted })
//     }
// }

// export function withdraw(amount) {
//     return { type: "account/withdraw", payload: amount }
// }

// export function requestLoan(amount, purpose) {
//     return {
//         type: "account/requestLoan",
//         payload: { amount: amount, purpose: purpose }
//     }
// }

// export function payloan() {
//     return {
//         type: "account/payloan",
//     }
// }