function Forecast({ title, items }) {
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />

      <div className="flex flex-row items-center justify-between text-white">
        {items?.map((item: any) => {
          return (
            <div
              key={item?.time_epoch}
              className="flex flex-col items-center justify-center"
            >
              <p className="font-light text-sm">
                {item?.time && new Date(item.time).getHours()}
              </p>
              <img src={item?.condition?.icon} className="w-12 my-1" alt="" />
              <p className="font-medium">{`${item?.temp_c?.toFixed()}°`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
