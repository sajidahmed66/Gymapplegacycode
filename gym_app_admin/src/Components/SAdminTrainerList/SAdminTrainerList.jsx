import React, { useEffect, useMemo, useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { connect } from "react-redux";

import Header from "./Header";
import Pagination from "./Pagination";
import Searching from "./Searching";

import useFullPageLoader from "../../Hooks/useFullPageLoader";

import { getFormattedIsoDate } from "../../HelperFunctions";

import { itemsPerPageOptions } from "../../Constants";

import { sAdminTrainerList } from "../../Api";

const SAdminTrainerList = (props) => {
  // different properties for individual column in the data table
  const tableHeaders = [
    {
      headerName: "First Name",
      apiField: "firstname",
      sortable: true,
      searchable: true,
      isNumber: false,
    },
    {
      headerName: "Last Name",
      apiField: "lastname",
      sortable: true,
      searchable: true,
      isNumber: false,
    },
    {
      headerName: "Contact No",
      apiField: "phone",
      sortable: true,
      searchable: true,
      isNumber: false,
    },
    {
      headerName: "Registration Date",
      apiField: "entryDate",
      sortable: true,
      searchable: true,
      isNumber: false,
    },
  ];

  // dynamically adding column object and column field name
  let searchableFieldObject = [];
  let searchableFieldName = [];
  tableHeaders.forEach((header) => {
    if (header.searchable) {
      searchableFieldObject.push(header);
      searchableFieldName.push(header.apiField);
    }
  });

  const dropdownItemsPerPage = itemsPerPageOptions;

  const [allTrainers, setAllTrainers] = useState([]); // all data from the api
  const [totalTrainers, setTotalTrainers] = useState(0); // number of data after computation
  const [currentPage, setCurrentPage] = useState(1); // current page no
  const [search, setSearch] = useState(""); // search field text
  const [sorting, setSorting] = useState({ apiField: "", order: "" }); //sorting field name in the api and order of sorting
  const [itemsPerPage, setItemsPerPage] = useState(10); // number of data in the page
  const [searchableField, setSearchableField] = useState(searchableFieldName); // field name in the api where search can be applied
  const [dropdownField] = useState(searchableFieldObject); // searchable field name for the advanced search in the dropdown
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useEffect(() => {
    const getAllTrainersList = () => {
      const { formattedToken } = props;
      showLoader();

      sAdminTrainerList.sAdminTrainerList(formattedToken).then((response) => {
        // console.log("trainer list use effect", response.data);
        hideLoader();
        setAllTrainers(response.data);
      });
    };

    getAllTrainersList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trainersData = useMemo(() => {
    let computedTrainers = allTrainers;

    if (search) {
      computedTrainers = computedTrainers.filter((trainer) => {
        // if the field is searchable, then searching
        let searchFound = false;

        for (const property in trainer) {
          if (searchableField.includes(property)) {
            searchFound =
              searchFound ||
              trainer[property]
                .toString()
                .toLowerCase()
                .includes(search.toLowerCase());
          }
        }

        return searchFound;
      });
    }

    setTotalTrainers(computedTrainers.length);

    // sorting trainers list
    if (sorting.apiField) {
      const reversed = sorting.order === "asc" ? 1 : -1;

      computedTrainers = computedTrainers.sort((a, b) => {
        // sorting for number type value
        if (!isNaN(a[sorting.apiField])) {
          return (
            parseInt(reversed) * (a[sorting.apiField] - b[sorting.apiField])
          );
        } else {
          // sorting for non number value
          return (
            parseInt(reversed) *
            a[sorting.apiField].localeCompare(b[sorting.apiField])
          );
        }
      });
    }

    // current page slice
    const startIndex = (parseInt(currentPage) - 1) * parseInt(itemsPerPage);
    const endIndex =
      (parseInt(currentPage) - 1) * parseInt(itemsPerPage) +
      parseInt(itemsPerPage);

    const data = computedTrainers.slice(startIndex, endIndex);

    const computedData = {
      data,
      startIndex,
      endIndex: parseInt(endIndex) - parseInt(itemsPerPage) + data.length,
      totalData: computedTrainers.length,
    };

    return computedData;
  }, [
    allTrainers,
    currentPage,
    search,
    sorting,
    itemsPerPage,
    searchableField,
  ]);

  const onChangeDropdown = (dropdownField) => {
    let changedSearchableField = [];

    dropdownField.forEach((header) => {
      if (header.searchable) {
        changedSearchableField.push(header.apiField);
      }

      setSearchableField(changedSearchableField);
      setCurrentPage(1);
    });
  };

  const onRemoveDropdown = (dropdownField) => {
    if (!dropdownField.length) {
      setSearchableField(searchableFieldName);
      setCurrentPage(1);
    } else {
      let changedSearchableField = [];

      dropdownField.forEach((header) => {
        if (header.searchable) {
          changedSearchableField.push(header.apiField);
        }

        setSearchableField(changedSearchableField);

        setCurrentPage(1);
      });
    }
  };

  return (
    <>
      <p className="h1 mb-4">Trainer List</p>

      <div className="row w-100">
        <div className="col mb-0 col-12 text center">
          <div className="row mb-2">
            <div className="col-lg-4">
              <div className="row">
                <p className="col-md-5">Records Per Page</p>

                <select
                  className="custom-select col-md-4 mb-3"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(e.target.value);
                    setCurrentPage(1);
                  }}
                  role="button"
                >
                  {dropdownItemsPerPage.map((data) => (
                    <option key={data.value} value={data.value}>
                      {data.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-lg-2 d-flex flex-row-reverse">
              <Searching
                onSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="col-lg-6 d-flex flex-row-reverse">
              <Multiselect
                options={dropdownField}
                displayValue={"headerName"}
                onSelect={onChangeDropdown}
                onRemove={onRemoveDropdown}
                emptyRecordMsg={"No column available"}
                placeholder={"Search by column"}
                avoidHighlightFirstOption={true}
                closeIcon={"cancel"}
              />
            </div>
          </div>

          <table className="table table-hover table-bordered">
            <Header
              tableHeaders={tableHeaders}
              onSorting={(apiField, order) => setSorting({ apiField, order })}
            />

            <tbody>
              {trainersData.data.map((data, index) => {
                const { date, month, year, hour, minute, second, miliSecond } =
                  getFormattedIsoDate(data.entryDate);

                return (
                  <tr key={index}>
                    <td>{data.firstname}</td>

                    <td>{data.lastname}</td>

                    <td>{data.phone}</td>

                    <td>
                      {date +
                        " " +
                        month +
                        ", " +
                        year +
                        " (" +
                        hour +
                        ":" +
                        minute +
                        ":" +
                        second +
                        ":" +
                        miliSecond +
                        ")"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="row">
            <div className="col-md-6">
              <Pagination
                totalTrainers={totalTrainers}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>

        <p className="text-muted ml-3">
          {trainersData.totalData ? (
            <>
              Showing {parseInt(trainersData.startIndex) + 1} to{" "}
              {trainersData.endIndex} from {trainersData.totalData} entries
            </>
          ) : (
            <>No Data Available</>
          )}
        </p>
      </div>

      {loader}
    </>
  );
};

const mapStateToProps = (state) => {
  const formattedToken = {
    headers: {
      "x-auth-token": state.sAdminLoginReducer.token,
    },
  };

  return {
    formattedToken,
  };
};

export default connect(mapStateToProps)(SAdminTrainerList);
