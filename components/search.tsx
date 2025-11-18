import { Dispatch, SetStateAction } from "react";

interface SearchTermsProps {
  searchTerm: string,
  setSearchTerm: Dispatch<SetStateAction<string>>
}

const Search = ({ searchTerm, setSearchTerm }: SearchTermsProps) => {
  
  return (
    <form className="search " >
      <div>
        <img src="./logo.png" alt="" />
        <input
          type="text"
          placeholder="Find Movies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
    </form>
  );
};

export default Search;
