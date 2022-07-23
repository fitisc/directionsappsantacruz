import { createSlice} from '@reduxjs/toolkit';
import * as FileSystem from 'expo-file-system';
import Place from '../models/Place';
import { URL_GEOCODING } from '../utils/maps';

const initialState = {
    places: [],
}

const placeSlice = createSlice({
    name: 'place',
    initialState,
    reducers: {
        addPlace: (state, action) => {
            const newPlace = new Place(Date.now(), action.payload.title, action.payload.image, action.payload.address, action.payload.coords);
            state.places.push(newPlace);
    }
    },

});

export const { addPlace } = placeSlice.actions;

export const savePlace = (title, image, coords) => {
    return async (dispatch) => {
        const response = await fetch( URL_GEOCODING(coords.lat, coords.lng) );
       
        if(!response) throw new Error("no se pudo conectar con el servidor");

        const data = await response.json();

        if(!data.results) throw new Error("no se pudo encontrar la direccion");

        const address = data.results[0].formatted_address;

        const fileName = image.split('/').pop();
        const Path = FileSystem.documentDirectory +	fileName;

        try {
            await FileSystem.moveAsync({ from:image, to:Path,});
        } catch (error) {
            console.log(error.message);
            throw error;
        }

        dispatch(addPlace({title, image: Path, address, coords}));
    }
}

export default placeSlice.reducer;