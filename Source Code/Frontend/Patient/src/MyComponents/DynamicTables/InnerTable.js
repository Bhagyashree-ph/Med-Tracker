import { IconButton, Table, TableBody, TableHead, TableCell, TableContainer, TableRow, Collapse, Box, Divider } from "@mui/material";
import React from "react";
import MyTypography from "../../assets/themes/MyTypography";

export default class InnerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { policies: [], headers: [], attrib: [] };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.values!== this.props.values) {
      this.setState({ policies: this.props.values, headers: this.props.headers, attrib: this.props.attrib });    
    }
  }

  render() {
    return (
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead sx={{ display: "table-header-group", backgroundColor: "#a3c8ed" }}>
            <TableRow>
              {console.log("policies : ", this.state.policies)}
              {this.state.headers.map((header) => (
                <TableCell align="left">
                  <MyTypography variant="h6" color="#4c4c4c">
                    {header}
                  </MyTypography>
                </TableCell>))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.policies.map((policy) => (
              <Row policy={policy} attrib={this.state.attrib} content={this.state.content}></Row>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

function Row({ policy, attrib }) {
  return (
    <React.Fragment>
      <TableRow>
        {attrib.map((attribute) => (<TableCell align="left"> <MyTypography variant="h6" weight='100'>{getNestedObjectVal(policy, attribute)} </MyTypography> </TableCell>))}
      </TableRow>
    </React.Fragment>
  )
}

function getNestedObjectVal(obj, attrib) {
    var index = attrib.indexOf('.');
  if (index != -1) {
    return getNestedObjectVal(obj[attrib.slice(0, index)], attrib.slice(index + 1))
  }
  return obj[attrib];
}