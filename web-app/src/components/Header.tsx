export const Header = () => {
    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="" className="-m-1.5 p-1.5 flex flex-row">
                        <span className="sr-only">Your Company</span>
                        <img className="h-6 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade800" alt="" />
                        <label className="font-bold ml-4 text-black">JourneyBot</label>
                    </a>
                </div>
                <div className="flex lg:hidden">
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
        </header>
    )
}