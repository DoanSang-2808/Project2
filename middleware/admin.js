export default function ({store, redirect, $cookies}) {
    store.dispatch("handleChangeFluid", true);
    store.dispatch("handleChangeBgImg", false);
    if($cookies.get("Account") !== undefined) {
        if($cookies.get("Account").role !== "admin") {
            return redirect('/home');
        }
    } else {
        return redirect('/login');
    }

}