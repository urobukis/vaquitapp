export function useFormatNumber(valor){
    if(typeof valor === "string"){
        return valor.replace(",", ".")
    }
    return valor
}