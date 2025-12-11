import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExampleState {
    example: string;
}

const initialState: ExampleState = {
    example: '',
};

const exampleSlice = createSlice({
    name: 'example',
    initialState: {
        example: '',
    } as ExampleState,
    reducers: {
        setExample: (state, action: PayloadAction<string>) => {
            state.example = action.payload;
        },
    },
});

export const {
    setExample,
} = exampleSlice.actions;
export default exampleSlice.reducer;