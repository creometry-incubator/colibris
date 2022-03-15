//GENERATED BY go-create
package services

import (
	d "github.com/creometry-incubator/colibris/database"
	m "github.com/creometry-incubator/colibris/models"
)

type ratingsService struct{}

type RatingsServiceInterface interface {
	GetRatings() (*[]m.Rating, error)
	GetRating(id int) (*m.Rating, error)
	GetRatingByUserId(id int) (*m.Rating, error)
	CreateRating(Rating *m.Rating) error
	UpdateRating(Rating *m.Rating) error
	DeleteRating(id int) error
}

func CreateRatingsService() RatingsServiceInterface {
	return &ratingsService{}
}
func (*ratingsService) GetRatings() (*[]m.Rating, error) {
	var Ratings []m.Rating
	if result := d.DB.Find(&Ratings); result.Error != nil {
		return nil, result.Error
	}
	return &Ratings, nil
}

func (*ratingsService) GetRating(id int) (*m.Rating, error) {
	var Rating m.Rating
	if result := d.DB.First(&Rating, id); result.Error != nil {
		return nil, result.Error
	}
	return &Rating, nil
}

func (*ratingsService) GetRatingByUserId(id int) (*m.Rating, error) {
	var Rating m.Rating
	if result := d.DB.Where("user_id = ?", id).First(&Rating); result.Error != nil {
		return nil, result.Error
	}
	return &Rating, nil
}

func (*ratingsService) CreateRating(Rating *m.Rating) error {
	if result := d.DB.Create(Rating); result.Error != nil {
		return result.Error
	}
	return nil
}

func (*ratingsService) UpdateRating(Rating *m.Rating) error {
	if result := d.DB.Save(Rating); result.Error != nil {
		return result.Error
	}
	return nil
}

func (*ratingsService) DeleteRating(id int) error {
	if result := d.DB.Delete(&m.Rating{ID: id}); result.Error != nil {
		return result.Error
	}
	return nil
}
