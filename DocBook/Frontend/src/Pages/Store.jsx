import React, { useState } from "react";

const medicinesData = [
  {
    id: 1,
    name: "Paracetamol",
    description: "For fever and mild pain relief",
    price: "$5",
    stock: 20,
    image:
      "https://imgs.search.brave.com/QnnsAdrkP3iQaPiNOG5Pk9G7uHf4LX-5QovmZbgV9wU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIy/MjAwMzQ5OS9waG90/by9nZW5lcmljLXBh/cmFjZXRhbW9sLXBp/bGxzLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1vR1RhRDQy/VjlxY2tvNGNLRXNw/OXEwOFRHNW9CUXpH/Yld2QWpQbXhGNm8w/PQ",
  },
  {
    id: 2,
    name: "Ibuprofen",
    description: "For inflammation and pain relief",
    price: "$8",
    stock: 15,
    image:
      "https://imgs.search.brave.com/84KKzld8lQIj40Cu4Hf27vJcZSYjM5utQ_3iD-x7fOQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQz/Mjk4Mjc4MC9waG90/by9pYnVwcm9mZW4t/cGlsbC1ib3R0bGUt/Y29uY2VwdHVhbC1p/bWFnZS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9M3M2Y3FG/STRObzFvZFdVVVRy/Z3oydjUtTDAyMHJy/aDNHQjJwZ2tKaDQ2/MD0",
  },
  {
    id: 3,
    name: "Amoxicillin",
    description: "Antibiotic for infections",
    price: "$12",
    stock: 10,
    image:
      "https://imgs.search.brave.com/ryOax618cQVXzxBIIhJYXFeQefm_IabmSWpRMARnmpU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzE0LzU2LzI5/LzM2MF9GXzUxNDU2/Mjk0OF8xN3FiV1Uy/bWh2Q3haamdhb2RY/TGt2dHlCdUlyVVJS/aC5qcGc",
  },
  {
    id: 4,
    name: "Cetirizine",
    description: "For allergies and runny nose",
    price: "$3",
    stock: 25,
    image:
      "https://imgs.search.brave.com/dLq3mjRd2kry_nXV3Ia0g2pyb3Fg4GJE-k9VXDJFuVc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxTEl6UEpGTllM/LmpwZw",
  },
  {
    id: 5,
    name: "Metformin",
    description: "For diabetes management",
    price: "$15",
    stock: 30,
    image:
      "https://imgs.search.brave.com/v4exMXn19o_NuWlyVuEIn84f50q3PADJeiCW6li_Qkw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzQxLzM1LzUw/LzM2MF9GXzU0MTM1/NTA4M185Q1Q3c1RM/OE5sNVdKRDk1WmtL/UFdEVEFNRVd3RjYy/My5qcGc",
  },
  {
    id: 6,
    name: "Omeprazole",
    description: "For acid reflux and heartburn",
    price: "$6",
    stock: 18,
    image:
      "https://imgs.search.brave.com/0upkgtxVc3TcNgKtMSJWq7tK0aNtY_B1yjh4AvffIw8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vcG9zdC5t/ZWRpY2FsbmV3c3Rv/ZGF5LmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvc2l0ZXMvMy8y/MDE5LzA3L2EtcGFj/a2V0LW9mLW9tZXBy/YXpvbGUtaW1hZ2Ut/Y3JlZGl0LXNpdWZh/aWhvLTIwMDYuanBn/P3c9MTE1NSZoPTE3/MzA",
  },
  {
    id: 7,
    name: "Azithromycin",
    description: "Antibiotic for bacterial infections",
    price: "$10",
    stock: 12,
    image:
      "https://imgs.search.brave.com/LsjOr672LqUzBgYiL_JL_BiKUqsCjZV-JssIq9K9Hp8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTcx/NTUxNTA1L3Bob3Rv/L2F6aXRocm9teWNp/bi10YWJsZXRzLWFu/dGliaW90aWMtZnVs/bC1jb3Vyc2UtdGhl/cmFweS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9Z2dWWFdz/ZGF1VnVqVk1QVHQz/ZFVOSjN1UmZLeXM4/alVFcHl6TnRnMllZ/MD0",
  },
  {
    id: 8,
    name: "Aspirin",
    description: "For pain relief and blood thinning",
    price: "$4",
    stock: 40,
    image:
      "https://imgs.search.brave.com/cuaRJKSY9gL7abDMnW8eoEcs1jz8OqoaPgLhPl1YdC8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJpdGFubmljYS5j/b20vNTMvMTQzNzUz/LTA1MC0wNDdFREE2/Ny9Bc3BpcmluLXBp/bGxzLmpwZz93PTQw/MCZoPTMwMCZjPWNy/b3A",
  },
  {
    id: 9,
    name: "Losartan",
    description: "For high blood pressure",
    price: "$7",
    stock: 22,
    image:
      "https://imgs.search.brave.com/kqPn0aIp--72p-1iT2sBGb0wHNVVt-7ttQEHyqr95HA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2luZ2xlY2FyZS5j/b20vYmxvZy93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNC8xMi9U/ZWxtaXNhcnRhbi12/cy4tbG9zYXJ0YW4t/NjAweDMzOC5wbmc",
  },
  {
    id: 10,
    name: "Salbutamol",
    description: "For asthma and bronchospasm",
    price: "$9",
    stock: 15,
    image:
      "https://imgs.search.brave.com/5rZSayvfWCyuWnDSqvQWk63j6f_iwUuPKFmfYfoyT2I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy84/Lzg1L1ZlbnRvbGlu/XzJtZy5KUEc",
  },
  {
    id: 11,
    name: "Ranitidine",
    description: "For stomach ulcers",
    price: "$6",
    stock: 28,
    image:
      "https://imgs.search.brave.com/mYSWGyxuxEquf58r5MU55L0l1hsYTSfJzUXIpA6yI1k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y3ZzLmNvbS93ZWJj/b250ZW50L2ltYWdl/cy9kcnVnL2RydWdp/bmZvX2luZGVwdGhf/cnhpbWFnZTIucG5n",
  },
  {
    id: 12,
    name: "Doxycycline",
    description: "Antibiotic for various infections",
    price: "$8",
    stock: 14,
    image:
      "https://imgs.search.brave.com/Q2pPQ-B2puHQUG-uy9OtmzdldAlssTQsLa0doeh0ccM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQz/Mjk4MjYxNi9waG90/by9kb3h5Y3ljbGlu/ZS1waWxsLWJvdHRs/ZS1jb25jZXB0dWFs/LWltYWdlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz0zM3lv/STc0bzNoa0pQYXNx/ZFgwOG5sYm1kaWJo/VGJ1VU8tT2V3cWJm/VFJFPQ",
  },
  {
    id: 13,
    name: "Hydroxychloroquine",
    description: "For malaria and autoimmune diseases",
    price: "$11",
    stock: 10,
    image:
      "https://imgs.search.brave.com/slhM3pi6zA76sl6qTYDduILg76Le_pgwAjsVybXYICU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQz/Mjk4Mjc1OS9waG90/by9oeWRyb3h5Y2hs/b3JvcXVpbmUtcGls/bC1ib3R0bGUtY29u/Y2VwdHVhbC1pbWFn/ZS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9bGRjLXNiRng2/dEUzeXRiWG1GUmd0/LURoVGdpdmxrUV9q/YVV6R2dRQ29QND0",
  },
  {
    id: 14,
    name: "Clopidogrel",
    description: "For preventing blood clots",
    price: "$12",
    stock: 20,
    image:
      "https://imgs.search.brave.com/0825nCaIH0coAwdCeKplO3MkFtBfnljcXK5omsY5Aug/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy82/LzYwL0Nsb3BpZG9n/cmVsXzEuanBn",
  },
  {
    id: 15,
    name: "Atorvastatin",
    description: "For lowering cholesterol",
    price: "$14",
    stock: 25,
    image:
      "https://imgs.search.brave.com/M67qinea1mYDGcWdGcF_nzxNjXqmkRdVFYye7N_VzJQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQz/Mjk4MjU0MS9waG90/by9hdG9ydmFzdGF0/aW4tcGlsbC1ib3R0/bGUtY29uY2VwdHVh/bC1pbWFnZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9c0pM/a2N4Y0IwTmZRWVN6/dlBRT2t6bDBvNGJp/UE9tMUljQjZ4V2pi/VFNXbz0",
  },
  {
    id: 16,
    name: "Levothyroxine",
    description: "For thyroid hormone replacement",
    price: "$10",
    stock: 18,
    image:
      "https://imgs.search.brave.com/3UTEeXlJamnHnj_Q8Oh9jB39S4IRdvBn3scjdO0dLuE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWVkc2NhcGVzdGF0/aWMuY29tL3BpL2Zl/YXR1cmVzL2RydWdk/aXJlY3Rvcnkvb2N0/dXBkYXRlL1dUUzA5/MDIwLmpwZw",
  },
  {
    id: 17,
    name: "Prednisolone",
    description: "For inflammation and allergies",
    price: "$9",
    stock: 12,
    image:
      "https://imgs.search.brave.com/iIuuVpVkP5t_OqQisj0y44HCMlRchdV_KsGleSL78mo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWVkc2NhcGVzdGF0/aWMuY29tL3BpL2Zl/YXR1cmVzL2RydWdk/aXJlY3Rvcnkvb2N0/dXBkYXRlLzAwMjA5/NDE3LmpwZw",
  },
  {
    id: 18,
    name: "Fluconazole",
    description: "For fungal infections",
    price: "$5",
    stock: 30,
    image:
      "https://imgs.search.brave.com/kPdNMJ05m_akcLGm0x9WPfd5q-DtMt3pEordfv0yjGY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzE1LzQzLzcx/LzM2MF9GXzUxNTQz/NzExM19wZUQ3THEy/eEx2WnJlZWkzbFFC/aVBrM2tTbTdGN0xs/VS5qcGc",
  },
  {
    id: 19,
    name: "Warfarin",
    description: "For preventing blood clots",
    price: "$8",
    stock: 15,
    image:
      "https://imgs.search.brave.com/UGhcomfmKVUZKAxwo8BAzk3w8NAf7-Oe7gn9dtGEy4Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDc5/NzEzNjc0L3Bob3Rv/L2JveC1vZi13YXJm/YXJpbi0xbWctdGFi/bGV0cy1vbi13aGl0/ZS1iYWNrZ3JvdW5k/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1pbkY4Q3ktR2h2/MEJjQ2JuYTdzcE01/Y09GRnBGQklyUHFD/R01xY2RwM0tRPQ",
  },
  {
    id: 20,
    name: "Insulin",
    description: "For diabetes management",
    price: "$25",
    stock: 8,
    image:
      "https://imgs.search.brave.com/ywam0XVMx0skkiJd8ozm0NyNLerb0dQxb7pSLT3YguE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bmlkZGsubmloLmdv/di8tL21lZGlhL0lt/YWdlcy9IZWFsdGgt/SW5mb3JtYXRpb24v/RGlhYmV0ZXMvUGhv/dG8tb2YtYS1uZWVk/bGUtd2l0aC1hLWJv/dHRsZS1vZi1pbnN1/bGluLmpwZw",
  },
];

const Store = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMedicines = medicinesData.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="store-page p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">
        Medicine Store
      </h1>

      {/* Search Bar */}
      <div className="search-bar mb-8 text-center">
        <input
          type="text"
          placeholder="Search for a medicine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/2 focus:outline-none focus:ring focus:ring-blue-400 shadow-md"
        />
      </div>

      {/* Medicine Cards */}
      <div className="medicine-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {filteredMedicines.length > 0 ? (
          filteredMedicines.map((medicine) => (
            <div
              key={medicine.id}
              className="medicine-card border rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow bg-blue-50"
            >
              <img
                src={medicine.image}
                alt={medicine.name}
                className="w-full h-24 object-cover rounded-md mb-2"
              />
              <h2 className="text-sm font-semibold text-gray-800 truncate">
                {medicine.name}
              </h2>
              <p className="text-xs text-gray-600 mt-1 truncate">
                {medicine.description}
              </p>
              <p className="text-sm text-green-600 font-bold mt-2">
                {medicine.price}
              </p>
              <p
                className={`mt-1 text-xs font-medium ${
                  medicine.stock > 0 ? "text-gray-700" : "text-red-500"
                }`}
              >
                {medicine.stock > 0
                  ? `In Stock: ${medicine.stock}`
                  : "Out of Stock"}
              </p>
              <button
                className={`mt-3 px-3 py-1 text-sm rounded-md text-white font-medium ${
                  medicine.stock > 0
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={medicine.stock === 0}
              >
                {medicine.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No medicines found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Store;