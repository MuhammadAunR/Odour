import Filter from '@/components/main/Filter'
import FilterContext from '../../context/FilterContext'

export default function ShopLayout({ children }) {
    return <FilterContext>
        <Filter />
        {children}
    </FilterContext>
}