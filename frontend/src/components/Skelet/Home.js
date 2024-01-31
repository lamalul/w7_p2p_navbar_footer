// import React from 'react';
// //import Product from '../Product/Product';
// import data from '../../data/data.json';
// import FilterComponent from '../Product/FilterComponent';

// function Home(props) {
//   console.log(props)
//   console.log(data.slice(props.productNumber))

//   return (
//     <div className="App">
//       <h1>{props.greeting} from the Homepage</h1>

//       {/* Include the FilterComponent instead the list of Product */}
//       <FilterComponent  data={data} />
//     </div>
//   );
// }

// export default Home;

// src/components/Skelets/Home.js
import React, { useState } from 'react';
import data from '../../data/data.json';
import FilterComponent from '../Product/FilterComponent';

function Home(props) {
  const [productData, setProductData] = useState(data);

  const updateDataState = (updatedData) => {
    setProductData(updatedData);
  };

  return (
    <div className="App">
      <h1>{props.greeting} from the Homepage</h1>

      {/* Include the FilterComponent instead of the list of Product */}
      <FilterComponent data={productData} updateDataState={updateDataState} />
    </div>
  );
}

export default Home;


/* import Product from '../Product/Product';
import data from '../../data/data.json';
import FilterComponent from '../Product/FilterComponent';


function Home(props) {
  console.log(props)
  console.log(data.slice(props.productNumber))
  return (
    <div className="App">
        <h1>{props.greeting} from the Homepage</h1>
        <div className="product-list">
        
        {data.slice(0,props.productNumber).map((product) => (
            <div className='product'>  
            <Product
            id={product.id}
            img={product.img}
            name={product.name}
            desc={product.desc}
            price={product.price}
            year={product.year}
          />
          </div>

          
     
      ))}

<h1>Product List</h1>
       
            
        </div>

    </div>
  );
}

export default Home;
 */