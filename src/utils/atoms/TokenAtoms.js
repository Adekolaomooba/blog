import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist';

const {persistAtom} = recoilPersist({
    key: 'recoil-persist',
    storage: localStorage
})


export const TokenAtom = atom({
    key: 'TokenAtom',
    default: {},
    effects_UNSTABLE: [persistAtom]
})


export const attachToken = selector({
    key: "useToken",
    get: ({get}) => {
        const tokenData = get(TokenAtom);

        console.log('check 1111', tokenData);
        
        if (tokenData && tokenData.access) {
            console.log('check 2222');

            return axios.interceptors.request.use(function (config) {
                const auth = tokenData?.access
                const decodeToken = jwtDecode(auth);
                const dateNow = new Date()
                console.log('check 3333');
                
                if (decodeToken.exp * 1000 < dateNow.getTime()) {
                    console.log('check 4444');

                    const setToken = useSetRecoilState(TokenAtom);
                    setToken(null);
                    window.location.href = '/'
                }
                console.log('check 5555');
                
                config.headers.Authorization = `Bearer ${auth}`
                console.log('the config', config);
                
                return config
            });
        }

        return null
    }
})