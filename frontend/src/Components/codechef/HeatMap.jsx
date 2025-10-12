import React from 'react';

const HeatMap = ({ data }) => {
  const getColor = (value) => {
    if (value === 0) return 'bg-gray-100';
    if (value < 5) return 'bg-emerald-100';
    if (value < 10) return 'bg-emerald-200';
    if (value < 15) return 'bg-emerald-300';
    if (value < 20) return 'bg-emerald-400';
    if (value < 25) return 'bg-emerald-500';
    if (value < 30) return 'bg-emerald-600';
    return 'bg-emerald-700';
  };

  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Group data by month and fill in missing days
  const groupedData = data.reduce((acc, item) => {
    const date = new Date(item.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    
    if (!acc[monthKey]) {
      // Initialize the month with empty days
      const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      acc[monthKey] = Array.from({ length: daysInMonth }, (_, i) => ({
        date: new Date(date.getFullYear(), date.getMonth(), i + 1).toISOString().split('T')[0],
        value: 0
      }));
    }
    
    // Update the actual day's value
    const dayIndex = date.getDate() - 1;
    acc[monthKey][dayIndex] = item;
    
    return acc;
  }, {});

  // Get unique day names for the legend
  const dayNames = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(2024, 0, i + 1); // Using a Sunday-starting week
    return getDayName(date);
  });

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <div className="inline-flex space-x-2">
          {/* Day labels column */}
          <div className="flex flex-col pt-6 pr-2">
            {dayNames.map((day) => (
              <div key={day} className="h-3 text-xs text-gray-400 mb-1">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          {Object.entries(groupedData).map(([monthKey, monthData]) => (
            <div key={monthKey} className="flex flex-col">
              <div className="text-xs text-gray-500 mb-1 text-center">
                {new Date(monthData[0].date).toLocaleDateString(undefined, { month: 'short' })}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {monthData.map((day, index) => {
                  const date = new Date(day.date);
                  return (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-sm ${getColor(day.value)} transition-colors duration-200 hover:ring-2 hover:ring-blue-400 cursor-pointer`}
                      title={`${date.toLocaleDateString()}: ${day.value} contributions`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-2">
        <span className="text-xs text-gray-500">Less</span>
        <div className="flex space-x-1">
          {[0, 5, 10, 15, 20, 25, 30].map((value) => (
            <div
              key={value}
              className={`w-3 h-3 rounded-sm ${getColor(value)}`}
              title={`${value}+ contributions`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500">More</span>
      </div>
    </div>
  );
};

export default HeatMap;