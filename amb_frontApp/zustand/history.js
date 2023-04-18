import {create} from 'zustand'
import initialData from './dataMarkups/historyMockup.js'

const store = (set, get) => ({
    historyItems: [],
    getItems: async () => {
        let data = initialData;

        data.sort(function(a, b) {
            return b.date - a.date;
          })
        set((state) => ({historyItems: [...data]}))

        
    },
})


const historyStore = create(store)

export default historyStore