import { DashboardsList } from '../dashboards-list';
import { ListType } from '../../types/list-type';

describe('DashboardsList', () => {
    test('is an array', () => {
        expect(Array.isArray(DashboardsList)).toBe(true);
    });

    test('has correct number of items', () => {
        expect(DashboardsList).toHaveLength(5);
    });

    test('all items have required properties', () => {
        DashboardsList.forEach((item: ListType) => {
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('name');
            expect(item).toHaveProperty('icon');

            expect(typeof item.id).toBe('string');
            expect(typeof item.name).toBe('string');
            // Icons are React components (objects in this context)
            expect(item.icon).toBeDefined();
        });
    });

    test('contains default dashboard item', () => {
        const defaultItem = DashboardsList.find(item => item.id === 'default');
        expect(defaultItem).toBeDefined();
        expect(defaultItem?.name).toBe('Default');
        expect(defaultItem?.subList).toBeUndefined();
    });

    test('contains order-list dashboard item', () => {
        const orderListItem = DashboardsList.find(item => item.id === 'order-list');
        expect(orderListItem).toBeDefined();
        expect(orderListItem?.name).toBe('Order List');
        expect(orderListItem?.subList).toBeUndefined();
    });

    test('eCommerce item has correct subList', () => {
        const ecommerceItem = DashboardsList.find(item => item.id === 'ecommerce');
        expect(ecommerceItem).toBeDefined();
        expect(ecommerceItem?.name).toBe('eCommerce');
        expect(ecommerceItem?.subList).toHaveLength(3);

        const subListIds = ecommerceItem?.subList?.map(sub => sub.id);
        expect(subListIds).toContain('amazon');
        expect(subListIds).toContain('flipkart');
        expect(subListIds).toContain('ebay');
    });

    test('projects item has correct subList', () => {
        const projectsItem = DashboardsList.find(item => item.id === 'projects');
        expect(projectsItem).toBeDefined();
        expect(projectsItem?.name).toBe('Projects');
        expect(projectsItem?.subList).toHaveLength(1);
        expect(projectsItem?.subList?.[0].id).toBe('github');
        expect(projectsItem?.subList?.[0].name).toBe('Github');
    });

    test('online courses item has correct subList', () => {
        const onlineCoursesItem = DashboardsList.find(item => item.id === 'onlineCourses');
        expect(onlineCoursesItem).toBeDefined();
        expect(onlineCoursesItem?.name).toBe('Online Courses');
        expect(onlineCoursesItem?.subList).toHaveLength(2);

        const subListIds = onlineCoursesItem?.subList?.map(sub => sub.id);
        expect(subListIds).toContain('Coursera');
        expect(subListIds).toContain('Udemy');
    });

    test('all subList items have required properties', () => {
        DashboardsList.forEach((item: ListType) => {
            if (item.subList) {
                item.subList.forEach(subItem => {
                    expect(subItem).toHaveProperty('id');
                    expect(subItem).toHaveProperty('name');
                    expect(typeof subItem.id).toBe('string');
                    expect(typeof subItem.name).toBe('string');
                });
            }
        });
    });

    test('all ids are unique', () => {
        const ids = DashboardsList.map(item => item.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
    });

    test('all names are non-empty strings', () => {
        DashboardsList.forEach((item: ListType) => {
            expect(item.name.length).toBeGreaterThan(0);
            expect(typeof item.name).toBe('string');
        });
    });

    test('icons are valid React components', () => {
        DashboardsList.forEach((item: ListType) => {
            // Icons are React components (imported as objects)
            expect(item.icon).toBeDefined();
            expect(item.icon).not.toBeNull();
        });
    });
});
