import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import PackageCard from '@/components/cards/PackageCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { setFilter, setSortBy, setCurrentPage } from '@/features/packages/packagesSlice';

const categories = ['Adventure', 'Honeymoon', 'Family', 'Solo', 'Luxury'];

const Packages = () => {
  const dispatch = useDispatch();
  const { filteredItems, filters, sortBy, currentPage, itemsPerPage } = useSelector((state) => state.packages);
  const [searchValue, setSearchValue] = useState(filters.search);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <MainLayout>
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Tour Packages</h1>
          <p className="text-primary-foreground/80">Find your perfect adventure</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-2 mb-6">
          <Button variant={!filters.category ? 'default' : 'outline'} onClick={() => dispatch(setFilter({ category: '' }))}>All</Button>
          {categories.map((cat) => (
            <Button key={cat} variant={filters.category === cat.toLowerCase() ? 'default' : 'outline'} onClick={() => dispatch(setFilter({ category: cat.toLowerCase() }))}>{cat}</Button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search packages..." value={searchValue} onChange={(e) => { setSearchValue(e.target.value); dispatch(setFilter({ search: e.target.value })); }} className="pl-10" />
          </div>
          <Select value={sortBy} onValueChange={(value) => dispatch(setSortBy(value))}>
            <SelectTrigger className="w-full md:w-48"><SelectValue placeholder="Sort by" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Most Popular</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedItems.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {[...Array(totalPages)].map((_, i) => (
              <Button key={i} variant={currentPage === i + 1 ? 'default' : 'outline'} size="sm" onClick={() => dispatch(setCurrentPage(i + 1))}>{i + 1}</Button>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Packages;
