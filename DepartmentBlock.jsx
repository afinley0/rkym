import React from "react";

export default class DepartmentBlock extends React.Component {
    render() {
        const department = this.props.department;
        const mentorIds = this.props.mentorIds;
        const mentorId = department.mentorid;

        return (
            <tr>
                <td>{department.dept}</td>
                <td>{ (mentorId !== "0") ? mentorIds[department.mentorid].lastName : "\u2014" }</td>
            </tr>
        );
    }
}
