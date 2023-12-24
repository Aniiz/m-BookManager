export default dateReplace = (date) => {
    const parts = date.replace(',', '').split(" ");

    const day = parts[1].trim();
    const month = parts[0].substring(0, 3).trim();
    const year = parts[2].trim();
    const formattedDate = `${day} ${month} - ${year}`;

    console.log(formattedDate)
    return formattedDate
}