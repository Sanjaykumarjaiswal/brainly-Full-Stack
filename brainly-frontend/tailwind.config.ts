/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors:{
                purple:{
                    200:"#dbe5ff",
                    500:"#4c4fa4",
                    600:"#4542d9"
                },
            gray : {   
                    100 : "#eeeeef",
                    200 : "#e6e9ed",
                    600 : "#95989c"
                }
            }
        },
    },
    plugins: [],
}
