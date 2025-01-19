import { Link } from '../interfaces/response.interface';

export function toLinks(
  prefix: string,
  page: number,
  size: number,
  totalPage: number,
): Link[] {
  let links: Link[] = new Array();
  for (let i = 0; i < 4; i++) {
    let link: Link;

    switch (i) {
      case 0:
        link = {
          active: page === 1 ? false : true,
          label: 'first',
          url: page === 1 ? null : `/${prefix}?page=1&size=${size}`,
        };
        break;
      case 1:
        link = {
          active: page === totalPage ? false : true,
          label: 'next',
          url:
            page === totalPage
              ? null
              : `/${prefix}?page=${page + 1}&size=${size}`,
        };
        break;
      case 2:
        link = {
          active: page === 1 ? false : true,
          label: 'prev',
          url: page === 1 ? null : `/${prefix}?page=${page - 1}&size=${size}`,
        };
        break;
      case 3:
        link = {
          active: page === totalPage ? false : true,
          label: 'last',
          url:
            page === totalPage
              ? null
              : `/${prefix}?page=${totalPage}&size=${size}`,
        };
        break;
    }
    links.push(link);
  }
  for (let j = 0; j < totalPage; j++) {
    const link: Link = {
      active: j + 1 !== page ? true : false,
      label: `${j + 1}`,
      url: `/${prefix}?page=${j + 1}&size${size}`,
    };
    links.push(link);
  }
  return links;
}
