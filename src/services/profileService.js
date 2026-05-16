let profileService = (() => {
    function getUser(id) {
        return Promise.resolve({
            _id: id || "demo-admin",
            username: sessionStorage.getItem("username") || "demo",
            profilePic: sessionStorage.getItem("profilePic"),
            isAdmin: sessionStorage.getItem("isAdmin") || "true"
        });
        
    }   

    function updateUser(id, object) {

       // PUT / user /: appKey /: id HTTP / 1.1
        let data = object;
        
        if (data.profilePic) {
            sessionStorage.setItem("profilePic", data.profilePic);
        }
        return Promise.resolve(Object.assign({ _id: id }, data))
        

    }   


    let id = sessionStorage.getItem("userId");

    function getId(){
        console.log(id);
    }

   



    return {
        getUser,
        updateUser,
        getId,
        
    }

})();
export default profileService;
