import React from "react";
import _ from "lodash";
import PropTypes from 'prop-types';

// on stateless component need to pass props as parameter, and this keyword from props

const Pagination = props => {
    console.log("currentPage", props.currentPage);
    // object destructuring
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if(pagesCount === 1) return null;

  //uses lodash npm javascrip uderscore library to get the array of page numbers
  const pageNumbers = _.range(1, pagesCount + 1);
  console.log(pageNumbers);

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(page => (
          <li key={page} className={page === currentPage ? 'page-item active':'page-item'}>
            <a 
            className="page-link"
            onClick={() => onPageChange(page)} 
            >{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired, 
    onPageChange: PropTypes.func.isRequired
}

export default Pagination;
