

const icons = {
    searchIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>,
    userIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>,
    cart: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>,
    handBurgerIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>,
    // loadingIcon: <svg
    //     class="container text-[10px]  "
       
    //     viewBox="0 0 40 40"
    //     height="20"
    //     width="20"> <circle
    //         class="track"
    //         cx="20"
    //         cy="20"
    //         r="17.5" pathlength="100"
    //         stroke-width="5px" fill="none"
    //     /> <circle
    //         class="car"
    //         cx="20"
    //         cy="20"
    //         r="17.5"
    //         pathlength="100"
    //         stroke-width="5px"
    //         fill="none"
    //     />
    // </svg>
       loadingIcon:<svg
       className="container text-[10px]"
       viewBox="0 0 40 40"
       height="20px"
       width="20px"
   >
       <circle
           className="track"
           cx="20"
           cy="20"
           r="17.5"
           pathLength="100"
           strokeWidth="5"
           fill="none"
       />
       <circle
           className="car"
           cx="20"
           cy="20"
           r="17.5"
           pathLength="100"
           strokeWidth="5"
           fill="none"
       />
   </svg>
   




}


export default icons 
