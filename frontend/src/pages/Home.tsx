import image from "../assets/hero-image.png";
import Navbar from "../components/Navbar";
import orange from "../assets/orange.png";
export default function Home() {
  return (
    <>
      <div className="p-10 h-screen w-screen bg-green-600 flex items-center justify-center">
        <div className=" h-full overflow-hidden shadow-xl rounded-lg w-full bg-green-100">
          <Navbar />

          <div className="flex h-full justify-center w-full ">
            <div className="w-[50%] px-12">
              <h2 className="text-5xl font-bold mt-12 mb-8">
                Fresh Grocery Delivery
              </h2>
              <h4 className="text-2xl font-semibold tracking-wider mb-2">
                Quick and convinient
              </h4>
              <p className="mb-8 pr-32">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                dicta necessitatibus praesentium nesciunt
              </p>

              <div className="border border-green-600 bg-orange-100 w-fit p-1 flex gap-2 rounded-full ">
                <button className="bg-green-600 px-3 py-1.5 rounded-s-full text-white">
                  Shop Now
                </button>
                <select className="bg-transparent border-none text-green-800">
                  <option value="volvo">Select Category</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </div>

              <div className="min-h-12 min-w-20 w-80 h-32 rounded-lg mt-5 bg-white flex items-center gap-3">
                <div>
                  <img src={orange} alt="" />
                </div>
                <div>
                  <h2 className="font-semibold">Zesty Naval Oranges</h2>
                  <div className="flex justify-between mt-4">
                    <div>
                      <p className="bg-green-200 px-2 text-center rounded-xl">1KG</p>
                      <p className="text-green-600 mt-2">900CFA</p>
                    </div>

                    <div className="text-sm text-green-600">
                      <p className="flex">
                        <svg
                          className="text-orange-300"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="m12 16.3l-3.7 2.825q-.275.225-.6.213t-.575-.188t-.387-.475t-.013-.65L8.15 13.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6t.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 3.475t.563.188t.387.537L14.4 9h4.475q.35 0 .6.213t.35.487t.025.6t-.375.525L15.85 13.4l1.425 4.625q.125.35-.012.65t-.388.475t-.575.188t-.6-.213z"
                          />
                        </svg>
                        4.6
                      </p>
                      <p className="bg-green-600 h-[30px] w-[30px] rounded-full text-white flex items-center justify-center mt-2">+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[50%] flex justify-end items-end px-4">
              <img
                src={image}
                alt=""
                className="h-[100%] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
