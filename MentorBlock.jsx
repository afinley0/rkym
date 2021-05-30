import React from 'react';

export default class MentorBlock extends  React.Component {
    render() {
        var mentor = this.props.mentor;

        return (
            <div style={{width: "120px"}} className="wp-caption alignleft">
                <img className="   " src={mentor.imageUrl} alt={mentor.firstName + ' ' + mentor.lastName}
                     width="110" height="110" />
                <p className="wp-caption-text">
                    <strong>
                        <a href={"http://www.pcc.edu/scripts/sdquery.pl?all=" + mentor.directory}>
                            {mentor.firstName} {mentor.lastName}
                        </a>
                    </strong>
                    <br />
                    {mentor.dept}, {mentor.campus}
                </p>
            </div>
        );
    }
}