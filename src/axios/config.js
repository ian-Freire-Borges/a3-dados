import axios from 'axios'

const sheetsData = axios.create({
  baseURL: 'https://opensheet.elk.sh/1C0PGRoDWGPG3plXLjx_NlBo-R7JHgwEpadRpju4T_bI'
})

export default sheetsData;