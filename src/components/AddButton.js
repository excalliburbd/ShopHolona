import React from 'react';

import Button from 'react-toolbox/lib/button/Button';

import './AddButton.css';

const AddButton = ({
  location,
  handleAddProduct,
  vendor,
  facebook,
}) => {

  if(!vendor && !facebook) {
    return null;
  }

  if(!vendor && facebook) {
    return <Button  floating
                    onClick={
                     () => {
                       const page = facebook.split('/')
                       window.open(`https://www.messenger.com/t/${page[page.length - 1] && page[page.length -1].length > 0 ? page[page.length - 1] : page[page.length - 2]}`);
                     }
                    }
                    className="addbutton addbutton-social" >
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARHSURBVFhH3ZhJaFVXHMZjap1Qoq2xccAY6sIuUnEM2i6sWqQELIpYNWgharULsRtRiANUiUaqdeFKUOywkhJcOBREEd04K0IMqGBVVKwDBpxiNfH33fc9n4835D7fYPUHH+ee7/zP/xzvi+f+7y1672lraytHk9Ds9vb2H2gXoBmoin5vhxUOFu6OZrH4LtrbtClhXDShLWg8VienyT0k780i69A9L/4Q7UOr0EysL9Eoib7u6Hz0K/1TtC9oNec8mstlsdNmD8k6kXQhuuNFjqCZqLtDOoTYQagO3XWOMzSjPPzmkKQPyfY46TmaCR56I8jRC9WR5wHtM7TMQ5nDZP2rm7y5rairh7KGXBXorHNvp/nAQ+Fg0kB0CT1BNbZzCpvq5s1pkztowv0HIrgrOoZa0Te284I2xRp/epMrbaeHwM2esMhWXmGpLqx1ED1H420nh4DRDmy0VRBYrx+6gy6w4c62EyHgb/QIDbBVMFhzvn+5BbbiYaDSAZtsFRTdOda+jJptxcPAZiQ+tVVwWHu5b9I4WzEwL6IT7mYE82rJu8LdDiG+P5rCnLijhf5gb7DeVgS8Mg+stxUa5uix91zzIe0miVOhoUfebmK72I6DMZ2/R9yNgDFR2Wnn2AoF8dWoVXNfI2GTeMXE1aJr6Bj9Hh5KgPG/0H13I2DMCVJTkdjqEGInMO9RZFoCrzbJteJUHOgGqJop9VBSGA/OYehmKzAXy6H93FZaiFMx+kBzUkFMPWp0V/2raJBTpISYtY7/yFZgqkaTmf4kB2IqUVA2Ca4bkX62lDD+LxrqFGkhbqOn9bQVmNVyaL+1lRQtgm46Vj9bUH7RltA/Lz8JKq1GBglCQOxv6Im7ETAqlIm2zlYCjKn8+gfpp5pHeFxVjKfH1SXliUL/MZrokFAQfxKdczcCuVRV3EP7bMWBX4pOIx0RKStpxvQCdd2b0zN9qodCwTT9Eipkt9mKweBOBp6iXrYC1EdLUX9baSHuM3QbfW8rNMwJThPa6bZiYOpk1+ASWwFYH/oyNMzp68uMYO1DSC9lsSMmCqZ+Zr0iXkkakGdYU2+FYoOtRNjcNEXQrrZVEFhSlYz+xlu4Tn/3CdqPVO5X2co7rNXgG7PYVmoI+gTdQtdRue28wRo/enN6vQ394lSFVFmrsqiwnXPI/R3ScaRDvsR2OJj0FWpBOjLG2s4JbEZ/c78g0Uy/zEOZwWQVBbr9GdeJqSDXCHTUeQ/Q9PFQ5jC5xImy3iA5hiMVFkKPQJX32X1ESrVB+irZ9aXrJ6TParHKw+D3w59M+zOKfub4D/3B5WCHZQeJ4jZI+zFqQAmFKp4+k9xAOgEe2g6gr/cd/YNyeyqQO7pBfTxaw2VQpHK9F43hchjtXKRN70C7kUr239FaVEPMEKfLPSQPNvgah1n0Cw+/fdhQ9A4eR1/b/v/ApvSaqOdz/r4tv9sUFb0EGQLuEyCHpHIAAAAASUVORK5CYII=" alt="messenger icon" className="messenger-icon"/>
                     </Button>
  }

  return (
    <Button icon='add'
            floating
            onClick={ handleAddProduct }
            className="addbutton"
            data-tour="add-product"/>
  );
}

export default AddButton;
