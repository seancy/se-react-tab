import React from "react";
import "./component.scss"
import LeftIcon from "./chevron-left-solid.svg"
import RightIcon from "./chevron-right-solid.svg"
import Dropdown from 'se-react-dropdown'

class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            pageNo:1 //props.pagination.pageNo
        };

    }

    firePageChange(){
        const {onPageChange} = this.props
        onPageChange && onPageChange(this.state.pageNo)
    }

    goPrevPage(e){
        if (e.currentTarget.classList.contains('disabled')) return
        this.setState((s,p)=>{
            let pageNo = s.pageNo - 1
            return {
                pageNo
            }
        },this.firePageChange)
    }

    goNextPage(e){
        if (e.currentTarget.classList.contains('disabled')) return
        this.setState((s,p)=>{
            let pageNo = s.pageNo + 1
            return {
                pageNo
            }
        },this.firePageChange)
    }

    switchPage(item){
        this.setState({pageNo:item.value}, this.firePageChange)
    }

    generatePagination(){
        const {pageNo} = this.state;
        const {pageSize, rowsCount} = this.props.pagination
        let pageCount = Math.ceil(rowsCount / pageSize)
        let pages = [...Array(pageCount).keys()].splice(1);
        pages = [...pages, pageCount || 1]
        pages = pages.map(p=>({value:p}))

        return (<div className="pagination">
                    <LeftIcon onClick={this.goPrevPage.bind(this)} className={"prev-page"+ (pageNo<=1 ? " disabled" : '')}/>
                    <span>Page</span>
                    <Dropdown data={pages} value={pageNo} onChange={this.switchPage.bind(this)}/>
                    <span>of {pageCount}</span>
                    <RightIcon onClick={this.goNextPage.bind(this)}
                               className={'next-page' + (pageNo>pageCount-1 ? ' disabled' : '')}/>
                </div>)
    }

    render() {
        const {totalData, fields, data, pagination} = this.props;
        //let pageNo = this.state.pageNo

        return (
            <div className={'se-react-data-list ' + (this.props.className || '')}>
                <div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            {fields.map(item => {
                                const {name, fieldName} = item;
                                return <th key={fieldName} className={'field-'+fieldName}>{name}</th>
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            (data.length <= 0)? (<tr><td className="cell-notification" colSpan={fields.length}>nothing</td></tr>) :
                            data.map(row => {
                            const id = row[this.props.keyField || 'id'];
                            return (
                                <tr key={id}>
                                    {Object.keys(row).map(key => {
                                        const field = fields.find(p => p.fieldName == key)
                                        return field && (<td key={key} className={'field-'+key}>
                                            {row[key] || ''}
                                        </td>)
                                    })}
                                </tr>
                            )
                        })}
                        </tbody>
                        <tfoot>
                        <tr>
                            {fields.filter(p=>p!=null).map(item => {
                                const {fieldName} = item;
                                return <th key={fieldName}>{totalData[fieldName] || ''}</th>
                            })}
                        </tr>
                        </tfoot>
                    </table>
                </div>
                {this.props.enableRowsCount && (<div className="total-rows">Total:{pagination['rowsCount']} rows</div>)}
                {this.generatePagination()}
            </div>
        );
    }
}

export default Component;

